# For those viewing this file on github
These are the notes I used to give my workshop, its a mix of complete sentences and pointform notes. If you missed something in the workshop, you might be able to find info about it here.


# Slide 1

- Workshop is about Discord Bots, using Discord.js
  - JS experience is not needed, but would of course be very helpful
- During all of this, we will touch on APIs and backend

# Slide 2

- First some introductions:
- 2B CE @ UW
- I like to draw, play video games and I'm a big fan of tech

# Slide 3

## Introduction:
- What are discord bots?
- Motivating factors: What you have to gain from this workshop, and why you should care

## Creating:
- Instantiate the application in the *Discord Developer Portal*
- Token, configure permissions, and the rest of the setup
- Where I will introduce the idea behind the bot we create today
- MAINLY SETUP

## Designing:
- When we will actually start coding, I will code the bot live for everyone
- I'll go through creating all the files and installing all the packages

## Deploying:
- There are many ways to deploy applications, let alone a discord bot
- I will go over some of the common ones:
  - Repl.it and AWS EC2

## Conclusion:
- Summarize everything, and leave room for questions

# Slide 4/5

- To summarize discord bots in one sentence:
  - Discord bots are assistants
  - They allow you to automate tasks that may be difficult, tedious or annoying
- If you are in a couple of discord servers, chances are you have seen a discord bot

# Slide 6

- Bots can moderate
  - Perform authentication/verification
  - Delete messages
  - Kick/Ban users

- Bots can play music
  - Simple and free way to listen to music with your friends

- Help out 
  - Perform other miscellaneous tasks
  - Giveaways for your community
  - Display the latest patch notes for your favorite video game
  - Bots can even be games, with currency systems, levels and game play

# Slide 7

- Really though, discord bots can do anything 
- This leads to my first motivating factor for learning about discord bots and that is it can be a great side project
- First reason for that: **Because bots can do anything, you have a lot of freedom, and with freedom comes passion**
  - By doing something that actually interests you, you can be motivated to finish and work hard on it
  - It will also be something you are excited about and will want to show people: Such as your interviewer for your internship
- Another reason is that **Discord bots are visual**
  - A philosophy I stand by is that people prefer visual things
  - Things will interest people if they can see things going on, think about sorting algorithms visualizations, or making an app
  - The great thing for us is Discord did most of the work for us, in creating a front end. 

# Slide 8
- Side projects are a great way to impress someone, but at the core the main motivation behind side projects is to learn
- Don't assume learning something like discord bots is niche and you won't apply this knowledge elsewhere
- At the core, discord bots are basically back ends
  - They are apps which receive information, transform it and send it back to our interface. 
  - Discord bots were my first exposure into node and apis and I learned a lot creating my first bot
- On the topic of APIs, we learn about how to interface with APIs and use the data they send
  - We will be dealing with JSON, but other APIs may send data back in XML
  - Your discord bot can take advantage of these universal data languages to send and receive data easily
  - If you don't know what APIs or JSON are, I will explain them from a beginner level when I program my bot
- Finally we are coding in javascript and using node
  - So of course we are getting practice in these technologies
  - Writing good code
  - Below is an example of a line of code from my first discord bot, happy to say that I have improved since then and no longer write code that looks like that

# Slide 9 

- Now that we've got the introduction sorted out, lets get started creating the bot

# Slide 10

- Now is a good time to intro what we are building today
- The Art Institute of Chicago has a public API which lets us access data about their artworks, artists, departments and a couple more things
- I am going to use this API to create a bot which displays art either randomly, by id or by a search query
- (look at image)

# Open the developer portal

- So, lets create our bot then
- Open up the discord developer portal, we're gonna have 4 tabs
   - First tab is applications, this is where your bots will be and the tab we care about
   - Teams lets you work on applications with other people
   - Final tab has the documentation for the offical discord API
     - You won't need to refer to this that often, because we will be using discord.js, an API that works on top of the discord api, but it could still be useful
- Lets go back to the applications tab
  - Start off by clicking **New Application**
  - Make a name for it, and just like that our application has been created
  - Right now its not a bot yet, you can use applications to create rich presence (the status things e.g. spotify games etc) or authentication (Log in with discord)
    - We want a bot however


- So lets click the bot tab and click **Add Bot**
  - Can make a name, give image

### Privileged Gateway Intents
- Sounds complicated, but its a form of permission
  - We need to turn on Message content intent
  - Save changes
- Go to OAuth2
  - **APPLICATION.COMMANDS** AND **BOT**
  - Select some permissions [send messages, use slash commands]
  - copy paste it
  - And there you go, the bot is added to your server
- It doesn't do anything yet, however, because we haven't told it what to do
- 
# Slide 11

- So the next part is, the part where we tell it to do something
- As with every good project, the first step of coding is to not code
  - And by that I mean it is to plan.

# Slide 12

- So here is how the data flow and be processed by our bot
- We start off with the user inputting data in discord
  - They will use one of these 3 commands
- Our bot will then see we typed this command and then get some data from the ARTIC API
  - For the random search, it will get a random artwork ID from the list of all artworks
    - The reason why we shouldn't just generate a random number using `Math.rand` or something similar is because theres no guarantee that every ID between 1 and 11 thousand whatever will be a valid artwork. They could have skipped numbers for any number of reasons, so we want to actually poll the API
  - For the query search, we use the APIs built in search function and get the ID of the artwork.
- After both of these we are left with an ID which feed back into the API to give us the full data we want
- We then output this to the user

# Slide 13
- All this talk about APIs, what is an API anyways? 
- API stands for Application Programming Interface
- APIs serve as middlemen who let two software applications communicate with eachother
- In other words, it lets Applications Interface with eachother (Programatically) 

# Slide 14

- My go-to analogy for APIs is a resturant
  - You are seated at a resturant and want to order something
  - The kitchen is waiting for orders in order to make food and let it be served
  - However, you cannot directly go get the food, and the kitchen doesn't know what you want to order
  - Thus we have an intermediary, the waiter/waitress to serve as the connection between you and the kitchen
  - The waiter/waitress takes your order, gives it to the kitchen, the kitchen makes your food and the waiter/waitress brings it back to you
- In this case
  - You are the client, the person asking for and receiving the data
  - The kitchen is like the servers where the data is stored
  - The waiter/waitress is the API, talking between the two
- So we can apply this to the 2 APIs we will be using
  - Discord.js is an API that connects discord with our bot
  - The ARTIC API connects the ARTIC servers with our bot

# Slide 15

- We can now setup our bot, I will be coding this live so feel free to follow along
  - Remember you will need node (16.9.0+)
  - I will be using VSCode
  - We will have to install some packages
    - `npm install discord.js @discordjs/rest undici`
    - `npm install -g nodemon`

# Slide 16
- First, we will do some file structure setup
- We will create these 9 files
  - These two in the root directory, the other seven in their respective folders 

# Open VSCode

##  `config.json`

Put the token here

## `index.js`

edit the guild and client id

# THE BOT IS DONE BEING CODED!!!

## Slide 18

Now, let's move on to deployment:

We are lucky that deploying discord bots is a fairly easy and straightforward process.
- Our discord bot runs entirely through our node script, so as long as that app is open, the bot will be on
  - So technically speaking, we can host our discord bot for "free" by running the app and keeping our computer open
  - We can also use an npm package called `forever` to automatically turn our bot back on when it crashes
  - This may not be practical, because your computer has to be on all the time

So thus, I present to you 4 deployment solutions, with pros and cons to each
- Repl.it
- Raspberry Pi
- Heroku
- AWS (EC2)

## Repl.it
- Repl.it is an online IDE and code sharing platform
  - One of its key selling points is real time code collaboration
  - Its IDE has a debugger, key value database, secrets (env variables) and even github integration
  - All of the above features makes it very convinient to host your bot on repl.it, and best of all, it is free
  - Your repl.it's won't be on forever so we cheat to make it stay on
    - We abuse the fact that repl.it keeps web apps on for 2 hours of inactivity, so if we make a web server in our bot, then ping it every 2 hours our bot will stay on forever
    - To do this, we can use a uptime detection site like uptime-robot which will send a request to our server every 5 min

  - Some downsides would be
    - It's a little bit slow, especially if your codebase gets larger or if you need to serve many people
    - For a small server with your friends, its perfect, but for bigger apps you might want to look for an alternate solution

## Raspberry Pi
- An unconventional yet simple solution can be to host your bot on a raspberry pi
  - A Raspberry Pi is a small computer that runs Linux
  - People use raspberry pi's for things like media centers, smart home, and small servers like our bot
  - They are relatively inexpensive, starting at around $60 CAD for a model with 2GB of ram, more than enough for a discord bot.
  - This approach follows the "keeping your computer on 24/7" approach, as we will just open our discord bot on our rasp pi and keep it running with `forever`
  - The voltage draw from a rasp pi is fairly small, so this is a fairly economical solution, and you have a lot of control over the deployment

## Heroku
- Heroku is a is a PaaS (platform as a service) solution
  - It has many features at different price tiers, such as postgres/redis intergrations, github integrations, auto CI/CD, metrics, scalability, containerization and many more
  - Discord has a great resource for how to set up you discord bot with heroku in their [documentation](https://discord.com/developers/docs/tutorials/hosting-on-heroku#:~:text=To%20create%20your%20Discord%20app,the%20Client%20ID%20for%20later.)

## AWS (Lightsail, Beanstalk, EC2)
- AWS is amazons offering for web
  - It has over 200 different services, covering the entire web space
  - There are multiple ways to host discord bots on AWS but I will just mention w
    - Lightsail, Beanstalk and EC2

### Lightsail
- Lightsail is a newer AWS service, allowing for very simple deployment of web applications
- This type of small scale deployment is enough for discord bots, and a lot of the features included in higher tier, more complex AWS services won't be utilixed to their full potential

### EC2 and Beanstalk
- EC2 is a linux server just like a rasbperry pi, but more feature rich and more complicated to set up
  - You get a free year of their 1GB RAM instance, but you will have to pay for bonus resources and storage
    - If you are new to deployment and web services then I wouldn't recommend trying to create an EC2 instance, it may be a little too complex. There is an entire job position just dedicated to managing deployment and management of services on AWS after all
- This is why there is an easier alternative for EC2 and thats beanstalk
  - Beanstalk sets up a EC2 instance for you. It accepts a zip file of all your code and runs `npm start`. This could be the better solution for beginners
