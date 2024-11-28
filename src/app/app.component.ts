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
    if (userCount !== 0) {
      // console.log('Les utilisateurs existent déjà dans la base de données.');
    } else {
      await db.users.add({groupsId: [1], name: 'Admin (the only one) ', username: 'admin', password: 'admin'});
      await db.users.add({groupsId: [], name: 'User 1', username: 'user1', password: 'user'});
      await db.users.add({groupsId: [], name: 'User 2', username: 'user2', password: 'user'});
      await db.users.add({groupsId: [], name: 'Anna', username: 'anna', password: 'anna'});
      await db.users.add({groupsId: [], name: 'Michel', username: 'michel', password: 'michel'});
      await db.users.add({groupsId: [], name: 'Thomas', username: '7homas', password: 'thomas>jb'});
      await db.users.add({groupsId: [], name: 'Alban S', username: 'alyrow', password: 'rust<scala'});
      await db.users.add({groupsId: [], name: 'Hélian C', username: 'lemieldesdauphins', password: 'profDeScala'});
      await db.users.add({groupsId: [], name: 'Clara L', username: 'siori', password: 'adoreLeFront'});
      await db.users.add({groupsId: [], name: 'Matt C', username: 'skynox', password: 'chapo'});
      await db.group.add({messages: [], usersId: [1,2,3]})
      // console.log('Utilisateurs ajoutés à la base Dexie !');
    }
  }

}
