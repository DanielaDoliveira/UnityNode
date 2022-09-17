using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.Security.Cryptography;
public class MenuManager : MonoBehaviour
{
    [Header("Login")]
    public GameObject login_canvas;
    public InputField login_email;
    public InputField login_password;
    public Button login_button;
    public Button login_newreg_button;

    [Space]
    [Header("Register")]
    public GameObject register_canvas;
    public InputField register_email;
    public InputField register_password;
    public InputField register_repassword;
    public Button register_button;
    public Button register_back_button;

    [Space]
    [Header("Message")]
    public GameObject message_canvas;
    public Text message_text;
    public Button close_button;

    [Space]
    [Header("Menu Game")]
    public GameObject menuGame_canvas;

    [Space]
    [Header("REST")]
    public REST_Controller rest_script;

    string menu_email;
    string menu_password;

    private void Start()
    {
        StartPanelLoginElements();
        StartPanelRegisterElements();
        StartPanelMessageElements();
       
       
       
        MenuActive(login_canvas);
    }



    #region ####### Assigning events to panel elements #######
    void StartPanelLoginElements()
    {
        menu_email = "";
        menu_password = "";

        login_button.onClick.AddListener(Button_Login);
        login_newreg_button.onClick.AddListener(Button_Login_NewRegister);

        login_email.text = PlayerPrefs.GetString("PLAYER_EMAIL","");
        login_password.text = PlayerPrefs.GetString("PLAYER_PASSWORD", "");


    }

    void StartPanelRegisterElements()
    {
        register_button.onClick.AddListener(Button_Register);
        register_back_button.onClick.AddListener(Register_Back_Button);
    }

    void StartPanelMessageElements()
    {
        close_button.onClick.AddListener(Button_Close);
    }

    #endregion

    #region ####### Reusable Functions #######

    void SetMessageError(string message)
    {
        message_text.text = message;
    }

    void EnableOtherCanvas(GameObject canvas, bool isEnabled)
    {
        canvas.SetActive(isEnabled);
    }


    #endregion

    #region ####### Canvas Manager #######

    // Function that recieves on <Message> format
    void MenuActive(GameObject canvas)
    {
     
        login_canvas.gameObject.SetActive(login_canvas.name.Equals(canvas.name));
        register_canvas.gameObject.SetActive(register_canvas.name.Equals(canvas.name));
        message_canvas.gameObject.SetActive(message_canvas.name.Equals(canvas.name));
        menuGame_canvas.gameObject.SetActive(menuGame_canvas.name.Equals(canvas.name));
    }

    // If it's allright Starts the Game
    void GetMessage(Message p_msg)
    {
        if(p_msg.GetMessage()!= "")
        {
            message_text.text = p_msg.GetMessage();
            EnableOtherCanvas(message_canvas, true);
            return;
        }
        StartGame();
    }

    #endregion

    #region ####### START THE GAME #######

    void StartGame()
    {
        if (menu_email != "" && menu_password!= "")
        {
            PlayerPrefs.SetString("PLAYER_EMAIL", menu_email);
            PlayerPrefs.SetString("PLAYER_PASSWORD", menu_password);
        }
        else
        {
            Debug.Log("[PlayerPrefs]The try to save email and password failed");
        }
        MenuActive(menuGame_canvas);
    }

    #endregion

    #region ####### Button_Login #######

    void Button_Login()
    {
        bool error = false;
        string email_temp = login_email.text;
        string pw_temp = login_password.text;

        if(email_temp == "" && pw_temp == "") 
        {
            SetMessageError("Type an email and a password!");
            error = true;
        }

        else if(email_temp == "")
        {
            SetMessageError("Type an email");
            error = true;
        }

        else if (pw_temp == "")
        {
            SetMessageError("Type a password");
            error = true;
        }

        else
        {
            error = false;
        }
        if (error)
        {
            EnableOtherCanvas(message_canvas,true);
            return;
        }
        menu_email = email_temp;
        menu_password = pw_temp;

        pw_temp = CryptPassword(pw_temp);
        Login_Send(email_temp,pw_temp);
    }
    #endregion



    #region #######  Close Input #######

    void Button_Close()
    {
        EnableOtherCanvas(message_canvas, false);
    }

    #endregion


    #region ####### Button_Register #######
    void Button_Register()
    {
        bool error = false;
        string email_temp = register_email.text;
        string pw_temp = register_password.text;
        string rpw_temp = register_repassword.text;

        if (email_temp == "" && pw_temp == "" && rpw_temp == "")
        {
            SetMessageError("The fields are blank!");
            error = true;
        }

        else if (email_temp == "")
        {
            SetMessageError("Type an email");
            error = true;
        }

        else if (pw_temp == "")
        {
            SetMessageError("Type a password");
            error = true;
        }
        else if (rpw_temp == "")
        {
            SetMessageError("Repeat Password field is blank");
            error = true;
        }
        else if(pw_temp != rpw_temp)
        {
            SetMessageError("Passwords do not match");
            error = true;
        }

        else
        {
            error = false;
        }
        if (error)
        {
            EnableOtherCanvas(message_canvas, true);
            return;
        }

        menu_email = email_temp;
        menu_password = pw_temp;
        pw_temp = CryptPassword(pw_temp);
        Register_Send(email_temp, pw_temp);
    }


    #endregion

    #region ####### New Register Button Input #######

    void Button_Login_NewRegister()
    {
        MenuActive(register_canvas);
        
    }

    #endregion

    #region ####### Button that Returns To Login #######

    void Register_Back_Button()
    {
        MenuActive(login_canvas);
    }

    #endregion

    #region ####### REST FUNCTIONS #######

    void Login_Send(string p_email, string p_password)
    {
        rest_script.SendRestGetLogin(p_email, p_password, GetMessage);
    }


    void Register_Send(string p_email, string p_password)
    {
        rest_script.SendRestPostRegister(p_email, p_password, GetMessage);
    }
    #endregion



    string CryptPassword(string p_password)
    {
        MD5 md5 = MD5.Create();
        string result = "";
        byte[] data = md5.ComputeHash(System.Text.Encoding.UTF8.GetBytes(p_password));

        for(int i = 0;i< data.Length; i++)
        {
            result += data[i].ToString("");
        }

        Debug.Log(result);
        return result; 
    }
}
