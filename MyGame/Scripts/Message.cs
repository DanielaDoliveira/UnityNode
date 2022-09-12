using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Message 
{
    public int status;
    public string message;

    string message_default = "A problem ocurred. Try again in few minutes";

    public Message()
    {

    }
    public Message(int p_status,string p_message)
    {
        this.status = p_status;
        this.message = p_message;

    }

    public string GetMessage()
    {
        if(this.message == "" && this.status != 200)
        {
            return message_default;
        }
        return this.message;
    }
}
