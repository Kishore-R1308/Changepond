use classicmodels;

select * from customers;
select * from employees;

select lastname , firstname , email from employees;

select concat(firstname," ",lastname) as Full_name, email from employees;

select * from employees where reportsTo = 1002;
select * from employees where reportsTo != 1002;
select * from employees where reportsTo > 1002;

select * from employees where reportsTo is null;
select * from employees where reportsTo is not null;

select * from employees where jobTitle = 'Sales rep';
select * from employees where jobTitle like '%Sales';
select * from orders;

select distinct status from orders;

select * from orders where status not in ('on hold','disputed','in process');

select * from orders where orderdate between '2003-10-02' and '2004-11-16';

select * from orders where orderdate between '2003-10-02' and '2004-11-16' or status = 'cancelled';

select * from orders where orderdate between '2003-10-02' and '2004-11-16' and status = 'cancelled';
select * from  payments;
select * from payments order by amount;

select * from payments order by amount desc;

select * from orders where orderdate 
between '2003-10-02' and '2004-11-16' or status = 'cancelled'
order by ordernumber desc , status asc,orderdate desc limit 3 offset 2;



