
# Create self-signed certificate
See https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-20-04-1
```
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/ssl/private/thetamillion-nft-selfsigned.key -out /etc/ssl/certs/thetamillion-nft-selfsigned.crt
```

# Nginx config

- `/etc/nginx/sites-available/nft.thetamillion.com`

```

upstream thetamillionapi {
    server 127.0.0.1:4101;
}

server {
    server_name nft.thetamillion.com;
    access_log /var/log/nginx/nft.thetamillion.com-access.log;
    error_log /var/log/nginx/nft.thetamillion.com-error.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://thetamillionapi/;
        proxy_redirect off;

        # By default the timeout is only 60s making some long-running queries impossible
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }
 
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/thetamillion-nft-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/thetamillion-nft-selfsigned.key;
    include /etc/nginx/snippets/ssl-params.conf;
}

```

- `ln -s /etc/nginx/sites-available/nft.thetamillion.com nft.thetamillion.com`