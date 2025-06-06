## TUTORIAL INSTALL DIBAWAH

## Requirements

Before setting up the project, ensure that you have the following installed:

- PHP (version 8.3 or higher)
- Composer
- NPM
- MySQL

## Installation

Follow the steps below to set up the project:

### 1. Clone the repository

```shell
git clone https://github.com/Satrio215/bappeda-banyuwangi.git
cd bappeda-banyuwangi
```

### 2. Install npm and Composer

```shell
npm i
composer i
```

### 3. Set up environment variables

```shell
cp .env.example .env
php artisan key:generate
```

### Note. Setting env sesuai mysql


### 4. Migrate tables to the database

```shell
php artisan migrate:fresh --seed
```

### 5. Run the application

```shell
npm run dev
php artisan serve
```
