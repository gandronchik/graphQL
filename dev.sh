#!/bin/sh

(cd backend; yarn)
(cd frontend; yarn)
(trap 'kill 0' SIGINT; (cd backend; yarn dev) & (cd frontend; yarn start))