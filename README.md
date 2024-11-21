# MessagesApp

## Running

To use my project, you just have to run the following command:

```bash
ng serve
```

Then, you can go to this link http://localhost:4200/ to try the app.

## How it works

### Creation or login
You can create your own account or use an existing account. You can find them in the app.component.ts file, with
the username and the password. For this project, I didn't try to do protected and hashed 
password, but we can easily imagine doing this for a bigger project.

### Navigation

You can navigate by using the sidebar. You can try to write a random url if you want but at your own risk.

### What you can do on the app

You can discuss with any users you can find on the list at the home page.

### Missing features

There is a 'Groups' tab but there is nothing on it : time is missing !
Same for the search bar that doesn't exist at all.

### Some areas of improvement

We can imagine a profile tab on which you can edit your profile. Maybe have more options for the user (profile picture, pseudo, little description).
Maybe the possibility to interact with some messages by adding some reactions like smileys or just the possibility to delete one of your message.

## How to reset database on your browser

You can try the shortcut 'CTRL + SHIFT + I' or just right click and press inspect on the page.
After that you can go to the 'Storage tab' where you'll find the 'Indexed DB'. Left click on it, then on the 'http://localhost:4200' and finally
right-click on the 'messagerieApp (default)' to delete it.




