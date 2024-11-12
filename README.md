Requires Python3, node.js

Copy project into directory and run terminal:

1. Init virtual environment:

  pyhton -m venv venv

2. Activate venv:

   venv\Scrips\activate   # For windows users
   venv\bin\activate   # For linux users

3. Install python dependencies:

  pip install -r requirements.txt

4. Install node.js dependencies

   cd frontend/
   npm install

-----------------------------------------------

Now you can configure and run project:

  1. Init database:
  
     python backend/manage.py makemigrations
     python backend/manage.py migrate

  2. Create superuser for admin-panel:

     python backend/manage.py createsuperuser

  3. Run development server:

     python backend/manage.py runserver

  4. Open another one terminal and run 'react' dev server:

     cd frontend/
     npm start
    
