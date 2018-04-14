import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import 'rxjs/Rx';

@Injectable()
export class AppService {
    private headers = new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
    });

    constructor(private http: Http) { }

    getEmployees() {
        return this.http.get('http://springbootdemo.us-east-2.elasticbeanstalk.com/employee/', { headers: this.headers }).map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        );
    }

    deleteAll() {
        return this.http.delete('http://springbootdemo.us-east-2.elasticbeanstalk.com/employee/', { headers: this.headers }).map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        );
    }

    deleteEmployee(eID) {
        return this.http.delete('http://springbootdemo.us-east-2.elasticbeanstalk.com/employee/' + eID, { headers: this.headers }).map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
        );
    }

    postEmployee(empJson: any) {
        return this.http.post('http://springbootdemo.us-east-2.elasticbeanstalk.com/employee/', empJson, { headers: this.headers }).map(
            (response: Response) => {
                const data = response.json(); 
                return data;
            }
        );
    }
}