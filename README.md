## socketio-loadtest

### How to run
*	`cd` to `server/` or `client/`.
* 	`npm install`.
*  `node main.js`.

### View ulimit
```
ulimit -a
ulimit -Hn
ulimit -Sn
```
	
### Set ulimit
* Append following two lines `/etc/security/limits.conf`.

```
ubuntu  soft    nofile  100000
ubuntu  hard    nofile  300000
```
*	Restart session.

### Nginx load balancing config
```
map $http_upgrade $connection_upgrade {
    	default upgrade;
    	'' close;
}

upstream sockserver {
        #ip_hash;
        server 172.31.1.102:3000;
        server 172.31.1.103:3000;
        #sticky cookie jsessionid;
}

server {

        location /socket.io {
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection $connection_upgrade;
                proxy_set_header Host $host;
                proxy_pass http://sockserver/socket.io;
                #proxy_pass http://172.31.1.102:3000;
        }
}
```
### Result

```
Without messages
t2micro - 22000 conncurrent connection

With messages
t2micro - 14000 conncurrent connection with avg latency of 4sec
```
### Others
```
172.31.1.141 - server, client
172.31.1.102 - server, client
172.31.1.103 - server, client
172.31.1.104 - load balancer (nginx)
```