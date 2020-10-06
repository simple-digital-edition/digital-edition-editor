import re
import json

from datetime import datetime

history = []
changes = []
release = None

with open('CHANGES.md') as in_f:
    for line in in_f:
        line = line.strip()
        match = re.fullmatch(r'## ([0-9]+\.[0-9]+\.[0-9]+) \(([0-9]+)\.([0-9]+)\.([0-9]+)\)', line)
        if match:
            if release:
                history.append(
                    {'version': release[0],
                     'date': release[1].isoformat(),
                     'changes': changes}
                )
                changes = []
            release = (match.group(1), datetime(int(match.group(4)), int(match.group(3)), int(match.group(2))))
        if release:
            print(line)
            match = re.fullmatch(r'\* \*\*(New|Update|Bugfix)\*\*: (.+)', line)
            if match:
                changes.append({'type': match.group(1).lower(),
                                'message': match.group(2)})

with open('src/digi_edit/static/changes.json', 'w') as out_f:
    json.dump(history, out_f)
