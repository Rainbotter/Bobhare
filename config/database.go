package config

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"log"
)

func setupDatabase() {

	db, err := sql.Open("sqlite3", "./foo.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
}
