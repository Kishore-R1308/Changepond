class Employee:
    empid =0
    def __init__(self,name,age,desg):
        self.name = name
        self.age = age
        self.desg = desg
        Employee.empid += 1
    def getEmpDetails(self):
        print("Employee id",Employee.empid)
        print("Employee name",self.name)
        print("Employee age",self.age)
        print("Employee designation",self.desg)

class Developer(Employee):
    def __init__(self,name,age,desg,resp):
        super().__init__(name,age,desg)
        self.resp = resp
    def getEmpDetails(self):
        super().getEmpDetails()
        print("Roles and Responsibilities",self.resp)

e = Employee("Nithi",22,"Trainee")
e.getEmpDetails()
e1 = Developer("Praveen",18,"Developer",["Coding","testing"])
e1.getEmpDetails()
        
 
