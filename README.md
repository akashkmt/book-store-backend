Base Url : https://book-backend-tardiverse.herokuapp.com

## User Routes

<li>Create User ( POST ) :  baseurl/createUser</li>
it will take name, email, and password as body of request and it will return response messages accordingly.

<li>Login User ( POST ) : baseurl/loginUser</li>
it will take email, and password as body of request and it will return a token if all things are right ie. email and password else it will return response messages accordingly.

<li>Get User ( GET ) : baseurl/getUser</li>
it will take token as header "token" and if token is valid then it will return logged user details as response else return error messages accordingly.

<li>Get Book List By Username ( GET ) : baseurl/getBookList?name=<"username"></li>
it will take Username a Query Parameter as mentioned in above link and it return the book list of that particular user or if user not found then it will return error messages accordingly.

<br />

## Book Routes

<li>Add Book ( POST ) : baseurl/addBook</li>
it will take title and description as body of request and then if the book is already present in DB then it will return error message else it will store this book in DB and return other error handling response messages as well.

<li>Search Book ( GET ) : baseurl/searchBook?title=<"bookTitle"></li>
it will take book title as Query Parameter as mentioned in above link and it will return the book details if book is present in DB else it will return error messages accordingly.

<li>Add Book to Personal Book List ( POST ) : baseurl/addBookToBookList/:bookId</li>
it will take bookId as path parameter ( request params ) and token as header and it will add the book to personal book list of logged in user. if book is already present in DB then it will return error message accordingly.

<li>Get All Books ( GET ): baseurl/getAllBooks</li>
it will return all books present in DB.

<li>Delete A Book From Your Personal Book List ( DELETE ) : baseurl/deleteBook/:bookId</li>
it will take bookId as path parameter ( request params ) and token as header and it will delete the book from personal book list of logged in user else it will return error messages accordingly.
