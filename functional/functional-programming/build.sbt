name := "HelloWorldServer"

version := "0.1"

scalaVersion := "2.13.12" // Or the version you want to use

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % "2.6.20",
  "com.typesafe.akka" %% "akka-http" % "10.2.10",
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.2.10",
  "com.typesafe.akka" %% "akka-stream" % "2.6.20" // Add this line
)
