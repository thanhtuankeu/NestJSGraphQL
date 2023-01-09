### Run app :
- npm start
Demo nestjs With graphQL intergrated :
- add swagger done : localhost:3003/api
- add graph QL next : 
  - https://www.youtube.com/watch?v=eHn64NxMwJY&t=141s
  - runninng on port http://localhost:3000/graphql
  - code first
- Add mysql as DB since it already running on computer
- URL shortener :
  url shorten attact to human or none
  currently random by hashing
  -random everytime
  - prob will need optimise
  - option : check if 3000 record plus . delete first 2000.

Redis reduce query by haft if hit 

# Set enviroment
set DB_HOST = "http://localhost/"
set DB_PORT = "5432"
set DB_USER = "airflow"
set DB_PASSWORD = "airflow"
set DB_NAME = "zoro"

set REDIS_URL = "localhost:6379"


# Deploy to Heroku :
  - 
find one cat in playground
```
  query{
    find(id: 1){
      name,catID,age 
    }
  }
  ```
get all cat :
```
  {
  getAllCat {
    catID
    name
    age
  }
}
```
get all cat with human related
```
{
  getAllCat {
    catID
    name
    age
    human {
      name
    }
  }
}
```

get all human with cat related
```
{
  getAllHuman {
    humanID
    name
    cats {
      catID
      name
    }
  }
}
```
query human with cat related
```
query {
  findOne(id: 1) {
    humanID
    name
    cats {
      catID
      name
    }
  }
}
```
query cat with human related
```
query {
  cats(id: 1) {
    humanID
    name
    human {
      humanID
      name
    }
  }
}
```
Create - Mutation
```
mutation {
  createHuman(project: { name: "syladc" }) {
    name
  }
}
mutation {
  createCat(cat: { name: "solar", age: 1, humanID : 1 }) {
    name
    human {
      name
    }
  }
}
```
URL related - Mutation
```
{
  getAllurl {link,shortURL,urlID}
}
mutation {
  createUrl(
    data: {
      link: "https://github.com/philhawksworth/linkylinky/tree/master/src/assets/js"
    }
  ) {
    link
    urlID,
    shortURL
  }
}

query {
  queryUrl(urlShort: "msiVSW") {
    link
  }
}

```

### Postman Sample
```
curl --location --request POST 'http://localhost:3000/graphql' \
--header 'Content-Type: application/json' \
--header 'Origin: http://localhost:3000' \
--data-raw '{"query":"{\r\n  getAllCat {\r\n    name,age\r\n  }\r\n}\r\n","variables":{}}'
```
### Next :
- Restrict field access
- Mutation 
- Human with link
- intergrate redis to speed query ()
  -init db done
  - try db
