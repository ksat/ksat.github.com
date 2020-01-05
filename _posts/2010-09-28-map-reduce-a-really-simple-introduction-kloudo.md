---
layout: post
title: Map Reduce - A really simple introduction
permalink: /map-reduce-a-really-simple-introduction-kloudo
---

Map Reduce: A really simple introduction
========================================

Ever since google
[published](http://labs.google.com/papers/mapreduce.html) its research
paper on map reduce, you have been hearing about it. Here and there. If
you have uptil now considered map-reduce a mysterious buzzword, and
ignored it, Know that its not. The basic concept is really very simple.
and in this tutorial I try to explain it in the simplest way that I can.
Note that I have intentionally missed out some deeper details to make it
really friendly to a beginner.  
 

Chapter 1: Your CEO’s Strange itch:
-----------------------------------

Imagine this. You work in a really big company. Your company is planning
to launch the next big “Blogging platform”. Tommorow morning you go to
your office and there’s a mail from your CEO regarding a new work:

    Dear  <Your Name>,
     As you know we are building the blogging platform blogger2.com, I need some statistics. I need to find out, Acorss all blogs ever wrriten on blogger.com, how many times 1 character words occur(like 'a', 'I'), How many times two character words occur (like 'be', 'is').. and so on till how many times do ten character words occur.

     I know its a really big job. So, I will assign, all 50,000 employees working in our company to work with you on this for a week.  I am going on a vacation for a week, and its really important that I've this when I return. Good luck.

    regds,
    The CEO

    P.s : and one more thing. Everything has to be done manually, except going to the blog and copy pasting it on notepad. I read somewhere that if you write programs, google can find out about it

Picture yourself in that position for a moment. You have 50,000 people
to work for you for a week. And you need to find out the number of 1
character words, No. of 2 character words etc., covering the maximum
number of blogs in blogspot. Finally you need to give a report to your
CEO with something like this:

-   Occurance of one character words – Around 937688399933
-   Occurance of two chracter words – Around 23388383830753434
-   .. hence forth till 10

If homicide, suicide or resigining the job is not an option, how would
you solve it? How would you avoid the chaos of so many people working.
How will you co-ordinate those many since the output of one has to be
merged with another?

You decide to take leave for the day, go home, sleep over it, and the
next day wake up with the greatest Idea ever. “S\*\*t! i wasted a
day!”  
 

Chapter 2: Your proclamation: Let there be caste
------------------------------------------------

The next day, You stand with a mike on the dias before 50,000 and
proclaim. For a week, you will all be divided into many groups:

-   The Mappers (tens of Thousands of people will be in this group)
-   The Grouper (Assume just one guy for now)
-   The Reducers( Around 10 of em.) and..
-   The Master(That’s you).

Then you talk to each one of the groups.  
 

Chapter 3: Your talk with The Mappers
-------------------------------------

Each mapper will get a set of 50 blog urls and really Big sheet of
paper. Each one of you need to go to each of that url. and for each word
in those blogs, write one line on the paper. The format of that line
should be the number of characters in the word, then a commna, and then
the actual word.

For example, if you find the word “a”, you write “1,a”, in a new line in
your paper. since the word “a” has only 1 character. If you find the
word “hello”, you write “5,hello” on the new line.

Each take 4 days. So, After 4 days, your sheet might look like this

-   “1,a”
-   “5,hello”
-   “2,if”
-   .. and a million more lines

**At the end of the 4th day. each one of you will give your sheet
completely filled to the Grouper**  
 

Chapter 4: Your talk with the Grouper
-------------------------------------

I will give you 10 papers. The first paper will be marked 1, the second
paper will be marked 2, and so on, till 10.

You collect the output from mappers and for each line in the mapper’s
sheet, if it says “1,<something>”, your write the <something> on sheet
1, if it says “2, <something>”, you write it on sheet two.

**For example, if the first line of a mapper’s sheet says “1,a”, you
write “a” on sheet 1. if it says “2,if”, your write “if” on sheet 2. If
it says “5,hello”, you write hello on sheet 5.**

So at the end of your work, the 10 sheets you have might look like this

-   Sheet 1: a, a ,a , I, I , i, a, i, i, i…. millions more
-   Sheet 2: if, of, it, of, of, if, at, im, is,is, of, of … millions
    more
-   Sheet 3 :the, the, and, for, met, bet, the, the, and, … millions
    more
-   ..
-   Sheet 10: ……

**once you are done, you distribute, each sheet to one reducer. For
example sheet 1 goes to reducer 1, sheet 2 goes to reducer 2 and so
on.**  
 

Chapter 5: Your talk with the Reducers:
---------------------------------------

Each one of you gets one sheet from the grouper. for each sheet you
count the number of words written on it and write it in big bold letters
on the back side of the paper.

For ex, if you are reducer 2. You get sheet 2 from the grouper that
looks like this:  
“Sheet 2: if, of, it, of, of, if, at, im, is,is, of, of …”

**You count the number of words on that sheet, say the number of words
is 28838380044, You write it on the back side of the paper , in big bold
letters and give it to me(the master).**  
 

Chapter 6: The controlled Chaos and the climax:
-----------------------------------------------

At the end of this process you have 10 sheets, Sheet 1, having the count
of the number of words with 1 character on the back side. Sheet2, having
the count of the number words with 2 characetrs on the back side. You
did it. Genius.

You essentially did map reduce. The greatest advantage in your approach
was this

-   The mappers can work independently
-   The reducers can work independently
-   The Grouper can work really fast, because, he din’t have to do any
    counting of words, all the had to do was to look at the first number
    and put that word in the appropriate sheet.

The process can be easily applied to other kinds of problems. In such a
case :

-   The work of the Master(dividing the work) and the Grouper(Grouping
    the values by key\[the value before commna\]), remains the same.
    This is what any map-reduce library provides.
-   The work of the mappers and reducers differ according to the
    problem. This is what you should write.

You can optimize this a little bit. And I am skipping those. For
example, you don’t even have to mention the words, every where, you
could have just written down “x”, instead of the actual word, since in
the end, we are just counting. And everything need not happen in a
sequence like First Mapper, the Grouper and then reducer. Moreover, one
person can be sometime do the job of a mapper and some other time the
job of a grouper. Give all this a thought and you will get more answers.

So You solve the biggest challenge ever posed to you. After a week You
collect the sheet of papers from the reducers. The back side of sheet 1
will have the number of occurences of words with 1 character. The back
side of sheet 2 will have the number of occurances of words with 2
characters and so on..

You put this information in a excel, Take a printout in a neat sheet of
paper and take it to your CEO with a big smile. “Good job “, he says,
“put it on the desk, I will take a look at it in a month” :)
