import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit, OnDestroy {
  server: {id: number, name: string, status: string};
  serverParams: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'];
        }
      );
    // const id = +this.route.snapshot.params['id'];   // '+' to convert to number
    // this.server = this.serversService.getServer(id);
    // this.serverParams = this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']); // '+' to convert to number
    //     }
    //   )
  }

  ngOnDestroy() {
    this.serverParams.unsubscribe();
  }

  onEdit(id: number) {
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}

