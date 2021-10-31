package bobhare

import (
	"fr/bobhare/src/config"
	"github.com/gin-gonic/gin"
	"log"
)

func Run() {
	r := gin.New()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	config.SetupRoutes(r)

	log.Fatal(r.Run(":9000"))
}
