### Visit [monkiehrms.vercel.app/](https://monkiehrms.vercel.app/) for the live demo

## For Setup:
1. npm init
2. make sure all the things are there which is on the package.json.
3. As I have us Shadcn which is component-based, you probably will have to copy all the files from the Shadcn website.
4. To set up Firebase, you only need the cloud function, firestore, and authentication. I have used react-firebase-hook for quicker implementation.
5. For cloud function, you must have to download Google Firebase SDK CLI, which is not something I would recommend, but it's cool. 
6. Used React-Hook-Form for some of the validations.
7. I didn't care for state management, but still used Context API because it's cool.
8. This should be running on vercel.
9. I guess that's pretty much it.

---

![image](https://github.com/raizrazer/monkiehrms/assets/41806230/18736698-31bf-4ff9-b569-5fe38132f116)# monkiehrms
A Leave Management HRMS by Monkie(Raiz)

The time taken to develop the app, was 18 hours, with some short breaks in between.
As I had work most of the near weekend days, I couldn't get to start earlier.
That's why I had to do a marathon-ish writing session.

---

Let's talk about the tech stack,
NextJS, Tailwind, Shadcn,
Google Firebase(Authentication,
Cloud Function, Firestore),
Radix UI functions,
Context API(for little state management).

---

 For the front end, I have used NextJS, as it's a flavor of React with more awesome features, even tho due to the hurry I haven't thought much about practical security issues with route handling client-side 😅 but I hope you'll understand.

**First I had to do a little bit of planning because I don't really know what I doing once I start without planning. And my chances of not finishing it are very high then, So planning is crucial for me.**

It's nothing Picasso-like, it's just the general idea of where things will be and how it will look.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/6afec489-76e8-4646-9ea6-0480ad3d5ffd)


**Simple and Neat Login page so less distraction**
![Image of the login](https://github.com/raizrazer/monkiehrms/assets/41806230/3d230824-a28e-4486-9c71-55aa1ada9eb9)


**Sign up isn't much different, same copy-paste of the Sign to save time**
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/927d6f70-ac06-47f8-8c92-d880d4172046)


**_Once the user signs up_**
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/fcb09023-20a6-4e77-bd3c-f267c7551c30)


They will be welcomed with an awesome pop-up, as they have signed in with just an email and password, they can now enter their full name.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/9c7aae54-4d45-4d49-b2ac-7e1da94609f4)


When they first join, it will just be their Email, once they enter their name, it will turn that word magically into their name, I mean it's not magic, it's just states.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/f1d9bf7b-514d-462a-8241-b4be93a7fadd)


As a proud employee of the company, now the user, ahm ahm the Employee can start applying leave I guess.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/5364d0c5-c7aa-499e-8901-1994377619f2)


They can input with such cool input ways, 'shadccnnnn'.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/bd0b998e-7ffb-422a-a684-42cd95c1f72f) ![image](https://github.com/raizrazer/monkiehrms/assets/41806230/17bd0466-a65a-441e-b659-28c141cd655f)


Once they apply, they can wait for the Overlord, I mean HR or Manager to approve their request for the leave.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/357d15ed-f90e-4968-a27c-8cbe7d8d0f2f)


This will be the manager's view to approve the leaves if they choose to.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/737ae8d1-d01b-4de2-90c3-fc53cdf6b09c)


They can Approve and Reject :< also.
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/bd89f4da-3429-4b3e-88d8-f45e7a65d9ab)


But don't worry, if you are a good boy, the HR Lord can you make a manager too.

**WITH JUST A FLICK OF THE SWITCH, VIOLA YOU CAN BE A MANAGER TOO**
![image](https://github.com/raizrazer/monkiehrms/assets/41806230/dd66ac4f-e82d-453a-8890-bf62e73c0892)

So, yeah that's the assignment which I was given.
I hope you liked it, I know it's very bad inside the code, but hey 18 hours of no sleep and 3 coffee, I think I am proud of myself.

But on a serious note, things I would do differently if I had more time, like a tonne of time.
I would have made most of the action with Auth and roles, and server actions.
I would have also made the login logout more easier with some Oauth providers.
Would have used MongoDB for more complex major operations.
But hey, who cares, I enjoyed it and it was fun. Learned about Cloud Functions too, and that's a plus.

