# movie
Movie application written by the MERN stack. Users can look up movie information, write and manage reviews, add movies to their favorite list, and change the order of movies in the favorite list through a ReactDND drag-and-drop interface.</br>
# Development Process
### Frontend</br>
I set up the router that process url request and go to the right file. I also set up the app page with navigation tools. I set up the server that communicates with the back-end API and added methods to the movie list and movie class which use the router methods. Inside the class, I initiated the variables with useState and used useCallback to create functions that are used in useEffect. I added the return component for both pages.

![alt 
text](screenshots/frontend/HW4_1.jpg)
![alt 
text](screenshots/frontend/HW4_2.jpg)
![alt 
text](screenshots/frontend/HW4_3.jpg)

I add the log-in and log-out features using google authentication API. I also added the review posting/editing page and the add review, edit review, and delete review buttons when the user is logged in (edit/ delete when the review's user id is the same as the user's id)

![alt 
text](screenshots/frontend/HW5_1.jpg)
![alt 
text](screenshots/frontend/HW5_2.jpg)

I add the favorite list feature and built the backend data access layer for changing the user's favorite list. Users can click on the star on every movie poster to add it to their favorite list.

![alt 
text](screenshots/frontend/HW6_1.jpg)
![alt 
text](screenshots/frontend/HW6_2.jpg)

I used ReactDND to add the drag-and-drop feature to the favorite list. Users can drag a movie in the favorite list and drop it to a different location to change its rank/order in the list. Order will be stored and will be consistent after users refresh or come back to the page.

![alt 
text](screenshots/frontend/drag1.jpg)
![alt 
text](screenshots/frontend/drag2.jpg)



### backend
I created the front-end and back-end directory and the files in back end 
directory. I loaded the dump file in 
MongoDB Compass and created a review collection. 

![alt 
text](screenshots/backend/HW2_1.jpg)
![alt
text](screenshots/backend/HW2_2.jpg)

The index, server, route, API, and DAO file's code are added. The index is listening to both the movie and review DAO. Three methods (get): get movie, get rating and get movie by ID are added in movie API, and three methods: post reviews (post), update reviews (put), and deleting reviews (delete) are added in review API, with the corresponding helper method in DAO. The route to enforce these methods is added in movies.route.js. 

![alt 
text](screenshots/backend/HW3_1.jpg)
![alt 
text](screenshots/backend/HW3_2.jpg)
![alt 
text](screenshots/backend/HW3_3.jpg)
