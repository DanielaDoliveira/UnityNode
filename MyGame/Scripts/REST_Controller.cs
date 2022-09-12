using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
public class REST_Controller : MonoBehaviour
{
    string WEB_URL = "localhost:3000";
    string routeLogin = "/login";
    string routeRegister = "/register";



    private void Start()
    {
        //SendRestGetLogin("demonstration@demo.com", "123@abc");
    }
    #region ####### PUBLIC FUNCTIONS #######
    public void SendRestGetLogin(string p_email, string p_password, System.Action<Message> callback)
    {
        Login login = new Login(p_email, p_password);

        //REST function
        StartCoroutine(LoginGet(WEB_URL, routeLogin, login, callback));

    }


    public void SendRestPostRegister(string p_email, string p_password, System.Action<Message> callback)
    {
        Login login = new Login(p_email, p_password);

        //REST function
        StartCoroutine(RegisterPost(WEB_URL, routeRegister, login, callback));

    }
    #endregion


    #region ####### LOGIN GET #######
    public IEnumerator LoginGet(string url, string route, Login loginPlayer, System.Action<Message> callback)
    {

        string urlNew = string.Format("{0}{1}/{2}/{3}", url, route, loginPlayer.Email,loginPlayer.Password );

        using (UnityWebRequest www = UnityWebRequest.Get(urlNew))
        {
            yield return www.SendWebRequest();
            if (www.isNetworkError)
            {
                Message msg_error = new Message((int)www.responseCode, www.error);

                Debug.Log(www.error);

                callback(msg_error);

            }
            else
            {
                if (www.isDone)
                {
                    string jsonResult = System.Text.Encoding.UTF8.GetString(www.downloadHandler.data);

                    Debug.Log(jsonResult);

                    Message msg_res = JsonUtility.FromJson<Message>(jsonResult);

                    callback(msg_res);

                }
            }
        }

    }
    #endregion

    #region ####### REGISTER POST #######
    public IEnumerator RegisterPost(string url, string route, Login loginPlayer, System.Action<Message> callback)
    {

        string urlNew = string.Format("{0}{1}", url, route);
        string jsonData = JsonUtility.ToJson(loginPlayer);
        using (UnityWebRequest www = UnityWebRequest.Post(urlNew,jsonData))
        {

            www.SetRequestHeader("content-type", "application/json");
            www.uploadHandler.contentType = "application/json";
            www.uploadHandler = new UploadHandlerRaw(System.Text.Encoding.UTF8.GetBytes(jsonData));
            yield return www.SendWebRequest();
            if (www.isNetworkError)
            {
                Message msg_error = new Message((int)www.responseCode, www.error);

                Debug.Log(www.error);

                callback(msg_error);

            }
            else
            {
                if (www.isDone)
                {
                    string jsonResult = System.Text.Encoding.UTF8.GetString(www.downloadHandler.data);

                    Debug.Log(jsonResult);

                    Message msg_res = JsonUtility.FromJson<Message>(jsonResult);

                    callback(msg_res);

                }
            }
        }

    }
    #endregion



}
