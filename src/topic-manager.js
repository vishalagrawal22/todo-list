import {
  publish as pub,
  subscribe as sub,
  unsubscribe as unsub,
} from "pubsub-js";

function subscribe(topic, callback) {
  return sub(topic, callback);
}

function publish(topic, data) {
  console.log(topic);
  console.log(data);
  return pub(topic, data);
}

function unsubscribe(token) {
  return unsub(token);
}

export { subscribe, unsubscribe, publish };
