Run app :
- npm startck
Demo nestjs With graphQL intergrated :
- add swagger done : localhost:3003/api
- add graph QL next : 
  - https://www.youtube.com/watch?v=eHn64NxMwJY&t=141s
  - runninng on port http://localhost:3000/graphql
  - code first
- Add mysql as DB since it already running on computer

find one cat in playground

  query{
    find(id: 1){
      name,catID,age 
    }
  }
get all cat :
  {
  getAllCat {
    catID
    name
    age
  }
}
get all cat with human related
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

get all human with cat related

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

query human with cat related

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

query cat with human related

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
