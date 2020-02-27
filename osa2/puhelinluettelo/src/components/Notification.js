import React from "react"


const Notification = ({ notification }) => {
    if(notification === null) return null
    var message = "";
    switch (notification.type) {
        case 'info':
            switch (notification.from) {
                case 'create':
                    message = "Added " + notification.data.name;
                    break;
                case 'update':
                    message = "Updated " + notification.data.name;
                    break;
                case 'delete':
                   message = "Deleted " + notification.data.name;
                   break;
                default:
                    break;
                }
            return (
                <div className="info">
                  {message}
                </div>
              )
        case 'error':
            switch (notification.from) {
                case 'create':
                    message = "Unable to create " + notification.data.name;
                    break;
                case 'update':
                    message = "Unable to update " + notification.data.name;
                    break;
                case 'delete':
                    message = notification.data.name + " has already been deleted!";
                    break;
                default:
                    break;
            }
            return (
                <div className="error">
                    {message}
                </div>
                )
        default:
            break;
    }
}

export default Notification;