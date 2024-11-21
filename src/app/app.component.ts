import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {db} from "./database";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'MessagesApp';

  async ngOnInit() {
    const userCount = await db.users.count();
    if (userCount === 0) {
      await db.users.add({name: 'Admin (the only one) ', username: 'admin', password: 'admin'});
      await db.users.add({name: 'User 1', username: 'user1', password: 'user'});
      await db.users.add({name: 'User 2', username: 'user2', password: 'user'});
      await db.users.add({name: 'Anna', username: 'anna', password: 'anna'});
      await db.users.add({name: 'Michel', username: 'michel', password: 'michel'});
      await db.users.add({name: 'Thomas', username: '7homas', password: 'thomas>jb'});
      await db.users.add({name: 'Alban S', username: 'alyrow', password: 'rust<scala'});
      await db.users.add({name: 'Hélian C', username: 'lemieldesdauphins', password: 'profDeScala'});
      await db.users.add({name: 'Clara L', username: 'siori', password: 'adoreLeFront'});
      await db.users.add({name: 'Matt C', username: 'skynox', password: 'chapo'});
      // console.log('Utilisateurs ajoutés à la base Dexie !');
    } else {
      // console.log('Les utilisateurs existent déjà dans la base de données.');
    }
  }

}
