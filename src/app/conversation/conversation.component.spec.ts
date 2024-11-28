    import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

    import {ConversationComponent} from './conversation.component';
    import {AuthService} from "../auth/authService/AuthService";
    import {FormsModule} from "@angular/forms";
    import {DatePipe} from "@angular/common";
    import {ActivatedRoute} from "@angular/router";
    import {of} from "rxjs";

    const mockAuthService = {
        getUserSession: jasmine.createSpy('getUserSession').and.returnValue({id: 1, name: 'User1'}),
        getUserById: jasmine.createSpy('getUserById').and.returnValue(Promise.resolve({id: 2, name: 'User2'}))
    };

    const mockDb = {
        messages: {
            toArray: jasmine.createSpy('toArray').and.returnValue(Promise.resolve([
                {
                    participants: [1, 2],
                    text: 'Hello',
                    senderId: 1,
                    receiverId: 2,
                    timestamp: new Date('2023-01-01T10:00:00')
                },
                {participants: [2, 1], text: 'Hi!', senderId: 2, receiverId: 1, timestamp: new Date('2023-01-01T10:05:00')}
            ])),
            add: jasmine.createSpy('add').and.returnValue(Promise.resolve())
        }
    };



    describe('ConversationComponent', () => {
        let component: ConversationComponent;
        let fixture: ComponentFixture<ConversationComponent>;
        let authService: AuthService;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [
                    FormsModule,
                    ConversationComponent,
                    DatePipe
                ],
                providers: [
                    {provide: AuthService, useValue: mockAuthService},
                    {provide: ActivatedRoute, useValue: {paramMap: of(new Map([['userId', '2']]))}},
                    {provide: 'db', useValue: mockDb}
                ]
            }).compileComponents();


            fixture = TestBed.createComponent(ConversationComponent);
            component = fixture.componentInstance;
            authService = TestBed.inject(AuthService);

            fixture.detectChanges();
        });


        it('should create', () => {
            expect(component).toBeTruthy();
        })

        it('should load messages at Init', fakeAsync( () => {
            // component.ngOnInit();
            // tick();

            fixture.detectChanges();
            expect(mockAuthService.getUserById).toHaveBeenCalledWith(2);
            expect(mockDb.messages.toArray).toHaveBeenCalled();
            // expect(component.messages.length).toBe(2);
            // expect(component.messages[0].text).toBe('Hello');
        }));

        it('should load messages', fakeAsync( () => {
            expect(mockAuthService.getUserSession).toHaveBeenCalledWith();
            expect(mockDb.messages.toArray).toHaveBeenCalled();


        }))



    });

