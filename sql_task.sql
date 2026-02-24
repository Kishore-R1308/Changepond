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

-- ******************************SUB QUERY**************************
select * from employees;
select * from employees where salary > (select avg(salary) from employees); -- 1

select customer_id,count(*) from orders group by customer_id having count(customer_id)>=1; -- 2


select customer_id,count(*) from orders group by customer_id having count(customer_id)<1; -- 3

select * from employees where salary > (select max(salary) from employees where department = 'hr'); -- 4

select * from orders where amount > (select avg(amount) from orders); -- 5

select * from employees where salary in (select salary from employees where department='finance'); -- 6

select * from orders where amount in (select amount  from orders where amount >=4000); -- 7

 select * from employees where salary =(select salary from employees order by salary desc limit 1 offset 1) ; -- 8
 
 select max(salary) from employees where salary < (select max(salary) from employees); -- 8
 
select * from employees where hire_date >
				(select hire_date from employees where department='hr' order by hire_date desc limit 1); -- 9
                
select * from orders where order_date like '2025%' ; -- 10

-- ******************************GROUP BY *****************************************************************************

select department,count(*) as dep_count from employees group by department; -- 1

select department,sum(salary) from employees group by department; -- 2

select department,avg(salary) from employees group by department; -- 3

select country,count(*) from customers group by country; -- 4

select customer_id ,sum(amount) from orders group by customer_id; -- 5

select status,count(*) from orders group by status; -- 6

select department,max(salary) from employees group by department; -- 7

select year(order_date),min(amount) from orders group by year(order_date); -- 8

select department from employees group by department having avg(salary) > 70000; -- 9

select customer_id,count(*) from orders group by customer_id having count(customer_id)>=1; -- 10

select country from customers group by country having count(*) > 2; -- 11

 select department from employees group by department having sum(salary) > 200000; -- 12
 
 select customer_id from orders group by customer_id having sum(amount) > 5000; -- 13
 
 select status from orders group by status having count(*) > 3; -- 14
 
 select * from orders where amount > (select avg(amount) from orders); -- 15
 
select department from employees group by department having avg(salary) > (select avg(salary) from employees) ; -- 16

select * from employees where salary > (select department,avg(salary) from employees group by department );

select * from employees e where salary > (select avg(salary) from employees e1 where e.department = e1.department); -- 17

select department,sum(salary) from employees group by department having max(salary) limit 1; -- 19


select department ,sum(salary) from employees group by department having max(salary) in(select max(salary) from employees); -- 19

select * from orders where amount = (select max(amount) from orders ); -- 20

-- **************************************************************************** joins *******************************************************************************
#inner join
 
select c.first_name, c.city, o.* from customers c inner join orders o on c.customer_id = o.customer_id; 

select concat(c.first_name, " ", c.last_name) as customer_name, o.order_date, o.amount from orders o inner join customers c on c.customer_id = o.customer_id where o.status = "completed";

select c.*, o.order_date from customers c inner join orders o on c.customer_id = o.customer_id where o.order_date like '%2025%';

select concat(c.first_name, " ", c.last_name) as customer_name, sum(amount) as total from orders o inner join customers c using(customer_id) group by customer_name order by total desc;

select o.*, c.country from orders o inner join customers c on c.customer_id = o.customer_id where o.amount > 3000;

# left joins
select c.*, o.* from customers c left join orders o on c.customer_id = o.customer_id;

select c.* from customers c left join orders o on c.customer_id = o.customer_id where o.order_id is null;

select c.*, count(o.order_id) as order_count from customers c left join orders o on c.customer_id = o.customer_id group by c.customer_id;

select e.first_name, e.department from employees e left join employees d using (employee_id) order by department;

select c.*, sum(o.amount) as total_amount from customers c left join orders o using (customer_id) group by c.customer_id;

# right joins
select o.*, c.* from customers c right join orders o using (customer_id);

select o.*, concat(c.first_name, " ", c.last_name) as customer_name from orders o right join customers c using (customer_id);

select o.*, c.city from customers c right join orders o using (customer_id);

# self joins 
use classicmodels; 

select concat(e.firstName," ",e.lastName) as empName,  concat(m.firstName," ",m.lastName) as managerName
from employees e left join employees m on m.employeeNumber=e.reportsTo;

select concat(e.firstName," ",e.lastName) as empName,e.reportsTo
from employees e join employees m on m.employeenumber = e.reportsTo
where e.employeeNumber > m.employeeNumber;

select concat(m.firstName," ",m.lastName) as managerName ,count(e.employeenumber) no_emp_per_manager
from employees e join employees m on m.employeeNumber=e.reportsto
group by e.reportsto;
    
select e.* from employees e join employees m  using(employeenumber)
where m.reportsto is null;


# cross joins
use sql_practice;

select c.*, e.* from customers c cross join employees e;

select e.department, o.status from employees e cross join orders o;

select c.*, e.job_title from customers c cross join employees e;

# mixed join
select concat(c.first_name, " ", c.last_name) as customer_name, sum(o.amount) as total from customers c inner join orders o using (customer_id) group by c.customer_id order by total desc;

select c.*, count(o.order_id) as order_count from customers c inner join orders o using (customer_id) group by c.customer_id having order_count >= 2;

select c.* from customers c left join orders o on c.customer_id = o.customer_id and o.status = 'completed' where o.order_id is null;

select c.*, sum(o.amount) as total from customers c inner join orders o using (customer_id) group by c.customer_id order by total desc limit 3;

select e.* from employees e join (select department, avg(salary) as avg_sal from employees group by department) d on e.department = d.department where e.salary > d.avg_sal;

select c.*, o.amount from customers c join orders o using (customer_id) where o.amount = (select max(amount) from orders);
