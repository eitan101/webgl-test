
            function createCharMaterial(lettersPerSide, fontSize) {
                var c = document.createElement('canvas');
                c.width = c.height = fontSize * lettersPerSide;
                var ctx = c.getContext('2d');
                ctx.font = 'bold '+fontSize + 'px Arial';
                ctx.fillStyle = '#C1D9D1';
                ctx.strokeStyle = '#135C44';
                var i = 0;

                for (var y = 0; y < lettersPerSide; y++) {
                    for (var x = 0; x < lettersPerSide; x++, i++) {
                        var ch = String.fromCharCode(i);
                        ctx.fillText(ch, x * fontSize, -(8 / 32) * fontSize + (y + 1) * fontSize);
                        ctx.strokeText(ch, x * fontSize, -(8 / 32) * fontSize + (y + 1) * fontSize);
                    }
                }
                var tex = new THREE.Texture(c);
                tex.needsUpdate = true;
                return tex;

            }

            function addTextToGeom(str, lettersPerSide, fontSize, geo, pos) {
                var j = -str.length/2, ln = 0;
                var base = geo.vertices.length;

                for (i = 0; i < str.length; i++) {
                    var code = str.charCodeAt(i);
                    var cx = code % lettersPerSide;
                    var cy = Math.floor((256 - code) / lettersPerSide);
                    var p = 12 / 16;
                    var dx = 0.9;
                    var dy = 1.0;
                    geo.vertices.push(
                            new THREE.Vector3(p * (j * dx + 0.05), p * (ln * dy + 0.05), 0).add(pos),
                            new THREE.Vector3(p * ((j + 1) * dx + 0.05), p * (ln * dy + 0.05), 0).add(pos),
                            new THREE.Vector3(p * ((j + 1) * dx + 0.05), p * ((ln + 1) * dy + 0.05), 0).add(pos),
                            new THREE.Vector3(p * (j * dx + 0.05), p * ((ln + 1) * dy + 0.05), 0).add(pos));
                    var ind = base + i*4;
                    geo.faces.push(
                            new THREE.Face3(ind + 0, ind + 1, ind + 2),
                            new THREE.Face3(ind + 0, ind + 2, ind + 3));

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
