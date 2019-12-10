import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, Role } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({ templateUrl: 'admin.component.html'})
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
    registerForm: FormGroup;
    register_user: User;
    States = Role;
    cadastro_realizado: boolean = false;
    currentUser: User;

    constructor(
        private userService: UserService
        ,private formBuilder: FormBuilder
        ,private authenticationService: AuthenticationService
        ) {
            this.currentUser = this.authenticationService.currentUserValue;
         }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }        
        this.register_user = Object.assign({}, this.registerForm.value);  
        this.userService.register(this.register_user).subscribe(() => {
            this.cadastro_realizado = true
            this.registerForm.reset()
            this.getUsers()
        });
    }
    getUsers(){
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
            this.users = this.users.filter(obj => obj.id != this.currentUser.id);
        });
    }
    apagarUsuario(id:number){
        this.userService.apagar_usuario(id).subscribe(() => {
            console.log("Usuário deleteado com sucesso")
            this.getUsers();
        })
    }




    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            FirstName: ['', Validators.required],
            LastName: ['', Validators.required],
            Username: ['', Validators.required],
            Password: ['', Validators.required],
            Role: ['', Validators.required]
        });
        this.getUsers()        
    }
}