from rest_framework import serializers


class MinValueValidator:
    def __init__(self, min_value: int) -> None:
        self._min_value = min_value

    def __call__(self, value: int):
        if value < self._min_value:
            raise serializers.ValidationError(f'the value must be at least {self._min_value}')


class InsolationValidator:
    def __call__(self, value):
        # TODO check if it is one of the possible values
        pass
