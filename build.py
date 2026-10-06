#!/usr/bin/env python3
"""Rebuilds index.html from the files in src/.

index.html is a single self-contained page: fonts, logo, runtime and the app are
all packed inside it. This script swaps the app parts (markup, logic, data layer)
for the versions in src/ and leaves everything else untouched.

    python3 build.py        # then double-click deploy.command to publish
"""
import base64, gzip, io, json, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')
INDEX = os.path.join(ROOT, 'index.html')

def read(p): return io.open(p, encoding='utf-8').read()

def block(html, kind):
    tag = '<script type="__bundler/%s">' % kind
    a = html.index(tag) + len(tag); b = html.index('</script>', a)
    return a, b

def main():
    html = read(INDEX)
    cfg = json.loads(read(os.path.join(SRC, 'config.json')))

    # 1) app markup + logic live in the page template
    a, b = block(html, 'template')
    tpl = json.loads(html[a:b])
    m0 = tpl.index('</helmet>') + len('</helmet>'); m1 = tpl.index('</x-dc>')
    s0 = tpl.index('>', tpl.index('<script type="text/x-dc"')) + 1; s1 = tpl.rindex('</script>')
    assert m0 < m1 < s0 < s1
    tpl = (tpl[:m0] + '\n' + read(os.path.join(SRC, 'app.template.html')).strip('\n') + '\n'
           + tpl[m1:s0] + '\n' + read(os.path.join(SRC, 'app.logic.js')).strip('\n') + '\n' + tpl[s1:])
    if '<title>' not in tpl:
        tpl = tpl.replace('<meta charset="utf-8">', '<meta charset="utf-8">\n<title>Etailflow Clock</title>', 1)
    enc = json.dumps(tpl, ensure_ascii=False).replace('</', '<\\u002F')
    html = html[:a] + '\n' + enc + '\n  ' + html[b:]

    # 2) data layer (store.js) is a gzip+base64 entry in the manifest
    store = read(os.path.join(SRC, 'store.js')).replace('__SB_URL__', cfg.get('supabaseUrl', '')).replace('__SB_KEY__', cfg.get('supabaseAnonKey', ''))
    ea, eb = block(html, 'ext_resources')
    uuid = [r['uuid'] for r in json.loads(html[ea:eb]) if r['id'] == 'storeJs'][0]
    a, b = block(html, 'manifest')
    man = json.loads(html[a:b])
    man[uuid]['data'] = base64.b64encode(gzip.compress(store.encode('utf-8'), mtime=0)).decode('ascii')
    man[uuid]['compressed'] = True
    html = html[:a] + '\n' + json.dumps(man, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\u002F') + '\n  ' + html[b:]

    io.open(INDEX, 'w', encoding='utf-8').write(html)
    print('index.html rebuilt (%d bytes); Supabase %s' % (len(html.encode('utf-8')), 'configured' if cfg.get('supabaseUrl') else 'NOT configured'))

if __name__ == '__main__':
    sys.exit(main())
