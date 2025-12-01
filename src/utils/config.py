# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'database': 'malawi_walkability',
    'user': 'postgres',
    'password': 'your_password',  
    'port': '5432'
}

def get_db_connection():
    import psycopg2
    return psycopg2.connect(**DB_CONFIG)