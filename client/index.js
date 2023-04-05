//accidentally deleted my code so just adding in 2nd iterations
const client = (() =>{
    let serviceWorker=undefined;
    const notificationbutton = document.getElementById("btn-notify");
    const showNotificationButton = () => {
        notificationbutton.style.display="block";
        notificationbutton.addEventListener("click", showNotification);
    }

    const showNotification = () => {
        //console.log("button clicked");
        const simpleTextNotification = reg => reg.showNotification("First Notification");

        const customizedNotifications = reg => {
            const options = {
                body: "spring semester is done",
                icon: "imgs/notification.png",
            actions: [
                {action: "search", title: "Search PPU"},
                {action: "close", title: "Nevermind"},
            ],
            data: [
                {notificationTime: Date.now()},
                {githubUser: "vincesmyk"},
            ],
            //options.actions = actions;
        }
            reg.showNotification('second notification', options)
        }
        navigator.serviceWorker.getRegistration()
        .then(registration=> simpleTextNotification(registration));
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