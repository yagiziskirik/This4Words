import json
from math import floor


class This4Words:
    def __init__(self):
        self._lst = []
        self._getList()


    def _getList(self):
        with open('lst.json') as f:
            self._lst = json.loads(f.read())


    def _addZero(self, n):
        if n < 10:
            nTemp = "00"
        elif n < 100:
            nTemp = "0"
        else:
            nTemp = ""
        return nTemp


    def _seedGenerator(self, x1, y1):
        x, y = round(float(x1), 6) + 180, round(float(y1), 6) + 90
        x = self._addZero(x) + str(floor(x*100000))
        y = self._addZero(y) + str(floor(y*100000))
        return int(x+y)


    def decrypt(self, s):
        q = s.split('.')
        q = list(reversed(q))
        t = 0
        for i, n in enumerate(q):
            t += self._lst.index(n) * len(self._lst) ** i
        q1 = str(t)
        qS = q1[:-8]
        qE = q1[-8:]
        x = int(qS)/100000 - 180
        y = int(qE)/100000 - 90
        return round(x, 5), round(y, 5)


    def _parseLocation(self, n):
        q = n
        l = len(self._lst)
        t = ""
        for i in reversed(range(4)):
            a1 = floor(q / l ** i)
            q -= a1 * l ** i
            t += self._lst[a1] + "."
        return t[:-1]


    def encrypt(self, x1, y1):
        seed = self._seedGenerator(x1, y1)
        return self._parseLocation(seed)


if __name__ == '__main__':
    print('To use the program, please checkout the README file!')