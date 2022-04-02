import uuid
import os


class Mail:
    def send(self, target: str, subject: str, content: str):
        assert '\n' not in subject, 'subject cannot contain newline character'

        mail = f"Subject: {subject}\n\n{content}"
        temp_filename = f'mail-{uuid.uuid4()}.txt'
        with open(temp_filename, 'w', encoding='utf-8') as f:
            f.write(mail)

        cat_command = f'cat {temp_filename}'
        send_command = f'msmtp {target}'

        os.system(' | '.join([cat_command, send_command]))
