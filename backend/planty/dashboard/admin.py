from django.contrib import admin

from .models import Instruction


class InstructionAdmin(admin.ModelAdmin):
    fields = ['id', 'name', 'user', 'species', 'watering', 'insolation', 'fertilizing']


admin.site.register(Instruction, InstructionAdmin)
