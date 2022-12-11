export function newId(): string {
    let now = Date.now(); // 1670162026403

    let parsed = now.toString().slice(6);

    return parsed;
}