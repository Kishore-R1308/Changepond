git commands 

1. git init - It will initialize/reinitialize the git repository 
2. git status - It will display the status of the files/folders in your git repository
3. git add <filename> - It will add the file in the staging enviroment so that it can be commited
4. git rm --cached <filename> - It will remove the file from staging environment to the working environment
5. git restore <filename> - If the file is modified in the working directory and it is different from staging environment it will restore it to the original file.
8. git add * - It will move all the working directory files to staging
9. git rm --cached * -r - It will move files from staging to working recursively (i.e if there are files in subfolders they will also moved to working)
10. git add -A - It will also move all files along with subfolders in the staging
11. git rm --cached -f - It will forcefully move the file from staging to working if the files are different in working and staging
12. git config  --list - Displays all the git configuration set parameters
13. git config user.name  "<username>" - it wil set the user name for commiting the files
14. git config user.email "<useremail>" - it will set user email in git configuration
15. git commit -m "<message>" - It will commit the files in staging to local repository i.e git repository
16. git log - It wil show the commit log history
17. git diff - It will show the difference between the git latest commited repository and the working directory file , in case they are not same
18. git diff <commit_id> - It will show the difference of files between latest commit version and the version you want to compare
19. git diff --staged - It will show the difference between latest commited version and the files in staging environment
20. git show - it will show the difference between latest and previous commit version
21. git reset <commit id> - It is soft reset it will reset the master branch to that given commit version without any changes in the working directory file
22. git reset <commit id> --hard - It will reset the master branch to that given commit version , it will also change the files as per the commited version file in the working directory
23. git remote -v - it shows all the remote links
24. git remote add origin <git hub repository link> - It will add the link between your remote repository to local repository
25. git push origin master - it will push your source code the remote repository
26. git pull origin master - it will download all the source files in the newly created project folder or existing folder
27. git clone <git repository url> - It will download the source code repository without creating the link with local repository
