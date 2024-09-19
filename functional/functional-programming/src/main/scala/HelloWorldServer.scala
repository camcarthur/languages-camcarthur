package example

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._
import scala.io.StdIn

object HelloWorldServer {

  def main(args: Array[String]): Unit = {
    implicit val system = ActorSystem(Behaviors.empty, "helloWorldSystem")
    implicit val executionContext = system.executionContext

    // Route to sort JSON list of strings
    val sortRoute =
      path("sort") {
        post {
          entity(as[List[String]]) { stringList =>
            val sortedList = stringList.sorted
            complete(sortedList)
          }
        }
      }

    // Existing greet route
    val greetRoute =
      path("greet" / Segment) { person =>
        get {
          complete(s"Hello, $person!")
        }
      }

    // Combine the routes
    val route = greetRoute ~ sortRoute

    // Start the server
    val bindingFuture = Http().newServerAt("localhost", 8080).bind(route)

    println("Server online at http://localhost:8080/\nPress RETURN to stop...")
    StdIn.readLine()
    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}
