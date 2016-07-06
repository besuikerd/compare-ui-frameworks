module Main exposing (..)

import Html exposing (..)
import Html.App as App

main : Program Never
main = App.program
  { init = init
  , subscriptions = subscriptions
  , update = update
  , view = view
  }


type alias Model =
  {
  }

type Msg =
  NoOp

init : (Model, Cmd Msg)
init =
  ( Model
  , Cmd.none
  )

subscriptions : Model -> Sub Msg
subscriptions model = Sub.none

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    _ -> model ! []

view : Model -> Html Msg
view model = div [] [ text "Todo" ]
