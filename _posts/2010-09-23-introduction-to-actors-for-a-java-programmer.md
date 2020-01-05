---
layout: post
title: A really Simple introduction to Actors for a Java Programmer
permalink: /introduction-to-actors-for-a-java-programmer
---

A really Simple introduction to Actors for a Java Programmer
============================================================

Modern languages, like Fantom and Scala are ditching the Java like
Threading model for an Actor based model. So is there something wrong
with Threads? Why do we need actors? Turns out that it’s really simple.

The Curse of Shared State
-------------------------

There is nothing wrong with threads in java. Its just that variables are
shared between threads. Each thread can see and modify the same
variables. To prevent accidental corruption you need to “synchronize”
blocks of your code so only one thread can access it at a time.

With actors, its sort of like each thread gets its own variables.(its
own state). Each actor can only see and modify these.

Remember Object Oriented encapsulation? – Where each function in a class
can only see and modify variables(if its private) in its class? Think of
Actors as applying the same principles to Threads. Its a new Level of
encapsulation for Threads.  
 

It’s Just a slight change in the point of view
----------------------------------------------

Imagine you and your friend decide to write this post down on a piece of
paper, each willing to write half of it. The problem is, you have a
shared paper to write down to. Now if both of you keep writing in the
paper at the same time, you corrupt the paper. So you need to take
turns(A.K.A synchronize). You do it this way because that’s the simplest
way. While one of you holds the paper and writes to it, the other waits.
But this way you aren’t really working in parallel, are you? This how
threads work. Lets see actors.

Rule\#1: Nobody shares papers
-----------------------------

Now imagine there’s a rule that no body shares papers. So, each one of
you is forced to get a piece of paper to write to. You are not allowed
to write on (or even see) others paper. Now, since you have your own
papers to write to, you can work independently, even on separate rooms.

Rule \#2: No tapping on the back or phone calls. You can send Email’s though
----------------------------------------------------------------------------

There’s Another rule, you are not allowed to talk to each other
synchronously. No tapping on your friends back or giving him a phone
call, thus disturbing him while he is writing. But you are allowed to
send him email. The difference is, he decides when to check the email.
If he wants to complete something, and then check the email, his choice.
And how does he give an answer to your question? By sending back a reply
through email. You get the point.

Rule \#3: You can’t change the massage’s content once you have sent it.
-----------------------------------------------------------------------

You don’t have any control on when, if at all your partner will see your
message. So you can’t guarantee the systems behaviour if you were
allowed to change the message after you sent it. Luckily, email doesn’t
allow you to do that. So Email’s Perfect.

Now lets see the definition of Actors again:
--------------------------------------------

-   Actors can execute in parallel (Just like you and your friend can
    write at the same time, on different papers)
-   Actors dont’ share state (You and your friend, never write on the
    same paper)
-   They communicate asynchronously (send Email, Don’t call or tapp his
    back with a ‘hey’)
-   Each actor has a queue to receive messages from other actors(Just
    like your email inbox)
-   The messages sent must be immutable ( Nobody should be able to
    modify the email after its sent)

That’s all. You got it, din’t you? :)
