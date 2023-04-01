//accidentally deleted my code so just adding in 2nd iterations
const client = (() =>{
    let serviceWorker=undefined;
    const notificationbutton = document.getElementById("btn-notify");
    const showNotificationButton = () => {
        notificationbutton.style.display="block";
    }
    const checkNotificationSupport = () =>{
        if(!('Notification' in window)){
            return Promise.reject("This browser doesn't support notifs");
        }
        console.log("the browser supports notifs");
        return Promise.resolve("Ok!");
    }
    const registerServiceWorker = () => {
        if(!('serviceWorker')in navigator){
            return Promise.reject("service worker is not available");
        }
        return navigator.serviceWorker.register('service-worker.js')
        .then(regObj => {
            console.log("service worker is registered");
            serviceWorkerRegObj = regObj;
            showNotificationButton();
        })

    }
    const requestNotificationPermissions = () => {
        return Notification.requestPermission(status =>{
            console.log("Notifications permission status:", status);
        })
    }
    checkNotificationSupport()
        .then(registerServiceWorker)
        .then(requestNotificationPermissions)
        .catch(err => console.error(err))
})()