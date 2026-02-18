def gsal(basl):
    return bsal+allowances(bsal)

def nsal(bsal):
    return gsal(bsal) - deductions(bsal)

def allowances(bsal):
    hra = bsal*0.3
    ta = bsal*0.2
    da = bsal*0.1
    return hra+ta+da

def deductions(bsal):
    pf = bsal*0.12
    if bsal > 10000:
        ptax = 200
    else:
        ptax = 0
    ins = 350
    return pf+ptax+ins

bsal = int(input("enter the basic salary: "))
print("Salary slip")
print("Basic salary:",bsal)
print("Allowances:",allowances(bsal))
print("Deductions:",deductions(bsal))
print("Gross salary:",gsal(bsal))
print("Net Salary:",nsal(bsal))
