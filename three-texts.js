
            function createCharMaterial(lettersPerSide, fontSize) {
                var c = document.createElement('canvas');
                c.width = c.height = fontSize * lettersPerSide;
                var ctx = c.getContext('2d');
                ctx.font = fontSize + 'px Monospace';
                var i = 0;

                for (var y = 0; y < lettersPerSide; y++) {
                    for (var x = 0; x < lettersPerSide; x++, i++) {
                        var ch = String.fromCharCode(i);
                        ctx.fillText(ch, x * fontSize, -(8 / 32) * fontSize + (y + 1) * fontSize);
                    }
                }
                var tex = new THREE.Texture(c);
                tex.needsUpdate = true;

                var mat = new THREE.MeshBasicMaterial({map: tex});
                mat.transparent = true;
                return mat;
            }

            function textGeom(str, lettersPerSide, fontSize) {
                var geo = new THREE.Geometry();
                var j = 0, ln = 0;

                for (i = 0; i < str.length; i++) {
                    var code = str.charCodeAt(i);
                    var cx = code % lettersPerSide;
                    var cy = Math.floor((256 - code) / lettersPerSide);
                    var p = 4 / 16;
                    var dx = 0.9;
                    var dy = 1.0;
                    geo.vertices.push(
                            new THREE.Vector3(p * (j * dx + 0.05), p * (ln * dy + 0.05), 0),
                            new THREE.Vector3(p * ((j + 1) * dx + 0.05), p * (ln * dy + 0.05), 0),
                            new THREE.Vector3(p * ((j + 1) * dx + 0.05), p * ((ln + 1) * dy + 0.05), 0),
                            new THREE.Vector3(p * (j * dx + 0.05), p * ((ln + 1) * dy + 0.05), 0));
                    geo.faces.push(
                            new THREE.Face3(i * 4 + 0, i * 4 + 1, i * 4 + 2),
                            new THREE.Face3(i * 4 + 0, i * 4 + 2, i * 4 + 3));

                    var ox = cx / lettersPerSide, oy = cy / lettersPerSide, off = 1 / lettersPerSide;
                    geo.faceVertexUvs[0].push([
                        new THREE.Vector2(ox, oy),
                        new THREE.Vector2(ox + off, oy),
                        new THREE.Vector2(ox + off, oy + off),
                    ], [
                        new THREE.Vector2(ox, oy),
                        new THREE.Vector2(ox + off, oy + off),
                        new THREE.Vector2(ox, oy + off),
                    ]);
                    if (code == 10) {
                        ln--;
                        j = 0;
                    } else 
                        j++;
                }
                return geo;
            }
