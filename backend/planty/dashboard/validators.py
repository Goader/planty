from rest_framework import serializers


class MinValueValidator:
    def __init__(self, min_value: int) -> None:
        self._min_value = min_value

    def __call__(self, value: int):
        if value < self._min_value:
            raise serializers.ValidationError(f'the value must be at least {self._min_value}')


class MaxValueValidator:
    def __init__(self, max_value: int) -> None:
        self._max_value = max_value

    def __call__(self, value: int):
        if value > self._max_value:
            raise serializers.ValidationError(f'the value must be at most {self._max_value}')


class InsolationValidator:
    insolation_values = ["low", "medium", "high"]

    def __call__(self, value):
        if value not in self.insolation_values:
            raise serializers.ValidationError(f'the value must be one of {self.insolation_values}')
