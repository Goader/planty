from datetime import datetime, timedelta

from apscheduler.triggers.base import BaseTrigger


def _is_int(s: str):
    try: 
        int(s)
        return True
    except ValueError:
        return False


class PolicyTrigger(BaseTrigger):
    def __init__(self, rule: str, zero_date: datetime) -> None:
        super(PolicyTrigger).__init__()

        # initial parameters
        self._zero_date: datetime = zero_date - timedelta(hours=1)  # so that the message is delivered an hour before the user usually waters a plant
        self._start_day: datetime = None
        self._days_interval: timedelta = None
        self._until_day: datetime = None

        # parsing the rule
        assert rule, 'rule cannot be an empty string'

        elements = rule.split(',')
        assert len(elements) <= 3, 'there cannot be more than 3 elements of the single rule - [start_day],*[days_interval],<[until which day to repeat]'

        # first element of the rule
        assert _is_int(elements[0]), 'first element of strategy must be an int'
        self._start_day = zero_date + timedelta(days=int(elements[0]))
        
        # second element of the rule
        if len(elements) >= 2:
            assert elements[1].startswith('*') and _is_int(elements[1][1:]), 'second element of strategy must start with an asterisk (*) and an integer following it'
            self._days_interval = timedelta(days=int(elements[1][1:]))

        # third element of the rule
        if len(elements) >= 3:
            assert elements[2].startswith('<') and _is_int(elements[2][1:]), 'third element of strategy must start with an "less" sign (<) and an integer following it'
            self._until_day = self._zero_date + timedelta(days=int(elements[1][1:]))

    def get_next_fire_time(self, previous_fire_time: datetime, now: datetime) -> datetime:
        if self._until_day is not None and now > self._until_day:
            return None

        if previous_fire_time:
            return previous_fire_time + self._days_interval

        if now < self._start_day:
            return self._start_day

        return None
