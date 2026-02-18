show databases;
use sql_practice;

select * from customers where country = 'india';

select * from employees order by salary desc limit 3;

select distinct status from orders;

select * from orders order by order_date desc limit 5;

select * from employees limit 3 offset 2;

select * from customers where city = 'pune' order by first_name;


#between

select * from employees where salary between 55000 and 85000;

select * from orders where order_date between '2024-03-01' and '2024-08-31';

select * from employees where hire_date between '2021-01-01' and '2023-12-31';

select * from orders where amount between 2000 and 4000;

#IN 

select * from customers where country in ('india','usa','uk');
select * from employees where department in ('hr','it','finance');
select * from orders where status in ('completed','pending');
select * from customers where city in('pune','mumbai','delhi');

#NOT IN

select * from employees where department not in ('it');
select * from customers where country not in ('india');
select * from orders where status not in ('cancelled');
select * from employees where department not in ('hr','sales');

#AND
select * from employees where department = 'it' and salary > 80000;
select * from customers where country = 'india' and city = 'pune';
select * from orders where order_date like '2024%' and amount > 3000;
select * from employees where hire_date > '2022-12-31' and salary > 60000;

#OR
select * from employees where department = 'it' or salary > 90000;
select * from customers where city = 'pune' or city = 'bangalore';
select * from orders where status = 'pending' or amount > 4000;
select * from employees where hire_date < '2022-01-01' or salary < 55000;

#LIKE
select * from customers where first_name like 'A%';
select * from employees where last_name like '%a';
select * from customers where email like '%gmail%';
select * from employees where first_name like '%ra%';

#MIXED CONDITIONS

select * from employees where department = 'it' and salary between 70000 and 95000;
select * from customers where country in ('india','usa') and city != 'pune';
select * from orders where order_date like '%2024%' and status = 'completed' and amount between 2000 and 5000;
select * from employees where department in ('it','hr') and salary > 65000;
select * from customers where first_name like 'R%' and country = 'india';
select * from employees where department = 'it' order by salary desc limit 5;



