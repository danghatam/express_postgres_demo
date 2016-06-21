### Create JSON APIs
Follow the step instruction, look at the rspec test cases, run the rspec
command, write code that passes the test case. 

[1] Rank by recency
```
  jasmine-node spec/controllers/posts_controller_spec.js # Line 53
  jasmine-node spec/controllers/posts_controller_spec.js # Line 64
```

[2] Create likes table and its association to posts
```
  # Basically a post has many likes associated to it
  # PLease add model test for this
```

[3] Rank by hot: >= 5 likes within the first hour of post creation
```
  jasmine-node spec/controllers/posts_controller_spec.js # Line 104
```

[4] Improve performance for hot. Let's say we have a lot of records in posts and
alot more in likes, how to improve the performance of the queries. A good
solution should be both fast and info should be up-to-date. If you need to
change the code please do, but remember to TDD.

Answer: i will use cronjob with redis. Every a hour**, schedule task will query to get hot posts, 
which was posted 2 hours ago (range-time) (query condition: created_at >= current - 2 hours, 
beside hot posts query condition). Then, all hot posts will be saved to redis, 
client's request will query redis's data.

** Schedule time can change. range-time = schedule time + 1 hour.

### Run the test suite and make it green ;)

