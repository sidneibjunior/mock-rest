# mock-rest
Customizable mock REST web service.

The following command runs the container and exposes the REST mock web service to host port `8080`.

```
$ docker run -p 8080:8080 -e "PORT=8080" -v /tmp/mock-rest-config.json:/home/node/app/config/mock-rest-config.json sidneibjunior/mock-rest:latest
```

### Configuration

#### Endpoints
The web service endpoints can be configured through a json file mapped to `/home/node/app/config/mock-rest-config.json` container's file.

The following properties can be set up for each endpoint:
- `path`: The endpoint path. Path variables can be defined using `:` prefix, like in `:id`
- `method`: HTTP method (`post`, `get`, `put`, `delete`, etc)
- `responseBody`: JSON string containing the response body (optional)

```
{
    "authorization": {
        "type": "basic",
        "username": "api-user",
        "password": "password"
    },
    "endpoints": [
        {
            "path": "/api/comments/:id",
            "method": "get",
            "responseBody": "{\"message\":\"My comment message\"}"
        },
        {
            "path": "/api/comments",
            "method": "post",
            "responseBody": "{\"message\":\"My comment message\"}"
        }
    ]
}
```

#### Authorization
The web service authorization can be configured through the optional `authorization` key of `mock-rest-config.json` config file. If the `authorization` key is not present on config file, `No Auth` will be used.
Currently only `basic` authorization type is supported.

#### Port
The container's port on which the server will run can be configured through environment variable `PORT`.

### Preview
![Mock REST](https://github.com/sidneibjunior/mock-rest/raw/master/docs/mock-rest.gif)

Github repository: https://github.com/sidneibjunior/mock-rest
