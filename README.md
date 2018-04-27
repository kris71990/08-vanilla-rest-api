# Lab 8-9 Vanilla HTTP server and REST API

## Usage
This HTTP server supports several endpoints that will generate meaningful responses to requests. The data used in this example are instances of a `Car` class, which has properties of `make`, `model`, and `year`. 

- ```POST to api/car?id={id}``` 

    - A post request to this endpoint which contains all properties of the Car class will create a new instance of a car, including a randomly generated id used to access the data, and write that data to a file.

- ```POST to api/car/all```

    - A post request to this endpoint which contains any number of instantiated cars will write each car object to its own file.

- ```GET from api/car?id={id}```

    - A get request to this endpoint with a specified id will retrieve the car object filed under that id. If an id is not given or does not reference an existing car, this will return an error message.

- ```GET from api/car/all```

    - A get request to this endpoint will retrieve every existing car object and return an array of file names for each object. File names are currently assigned to be the randomly generated id that was created when the object was first created. 

- ```DELETE from api/car?id={id}```

    - A delete request to this endpoint with a specified id will delete the object with this id. If the object does not exist or no id is given, it will return an error. 