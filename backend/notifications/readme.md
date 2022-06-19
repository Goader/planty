# Notifications sender

This service listens on the database changes, and if the date of the latest time the plant was watered has changed, it schedules jobs for notifying the user about the next time.

## Environment variables specification

For each action it contains special messages and notification strategy.

Messages are separated using the specified in `MESSAGE_SEPARATOR` separator, by default it is `$$$$$`

For example, for watering we have:

* `WATERING_NOTIFICATION_STRATEGY`

    ```
    -1;0;1;3;6,*3
    ```

* `WATERING_NOTIFICATION_MESSAGES`

    ```
    Hey!

    Your plant - {plant_name} needs to be watered tomorrow! Don't forget about it!

    Planty
    $$$$$
    Hello!

    Make sure to water {plant_name} today!

    Planty
    $$$$$
    Hi!

    You have forgotten to water {plant_name} yesterday! It's not a problem, you can do it today, just try to not forget about it again ;)

    Planty
    $$$$$
    Hello!

    It has been 3 days since you had to water {plant_name}. Be responsible! Do it as soon as you can, otherwise plant may suffer :(
        
    Planty
    $$$$$
    Oh my god!

    So many days since you have watered {plant_name}. It must have already died or something! Just tell me you have simply forgotten to click in the application, and you have watered it a few days ago!
    If not, then DO IT NOW!

    Planty
    ```

### Definition

* each notification strategy rule is separated by a semicolon (`;`)
* a strategy must have the same count of rules as there are messages
* each n-th message corresponds to the n-th rule (1st rule `-1` and 1st message, 2nd rule `0` and 2nd message, and so on..)
* rules have the following format: `[start day],*[interval],<[until]`
  * `start day` contains an integer which tells us the number of days from the next watering (for example, `-1` would mean a day before the next watering date, `6` means six days after)
  * `interval` is preceded by an asterisk (`*`) and tells us the interval between messages, if we want to make the periodical (for example, `0,*3` would mean sending a message at the day of the next watering, and then each 3 days)
  * `until` is preceded by a "less" sign (`<`) and tells us until which day should we continue periodical messages (for example, `-5,*1,<0` means we would start sending a message 5 days before the watering, send it every day until the day of the watering, so it won't continue further)
* the rule can be in 3 variants:
  * having only `start day` - `[start day]`
  * having `start day` and an `interval` - `[start day],*[interval]`
  * having `start day`, `interval` and `until` - `[start day],*[interval],<[until]`
